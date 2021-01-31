package com.springreact.demo.service;

import com.springreact.demo.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends ExtendRepository<Post>{
    Page<Post> findAllByTitleContains(Pageable pageable, String keyword);
}
